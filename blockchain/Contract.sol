pragma solidity ^0.4.17;

contract Store {
	// unique identifier for each store based on Google Map PlaceID
  string public placeID;
  uint256 public totalScore;
  uint256 public totalReviewAmount;
  Review[] public allReviews;
  // map reviewer address with its index value in allReviews array +1
  // as allReviews index starts with 0, and mapping is initialized with 0.
  mapping (address => uint256) public reviewIndexPlusOneByReviewer;
  // first address: voter; second address: reviewer
  mapping (address => mapping (address => bool) ) public voted;
  address public escrowAddress;

  struct Review {
    string comment;
    uint256 score;
    address uploader;
    uint256 upvote;
    uint256 downvote;
    uint256 last_update;
    uint256 positive_impact;
    uint256 negative_impact;
  }

  event LogVoteAdded(address indexed voter, address indexed reviewer, bool is_upvote);

  modifier onlyEscrow(){
    require(msg.sender == escrowAddress);
    _;
  }

  modifier validScore(uint256 _score) {
    require(_score >= 0 && _score <= 100);
    _;
  }

  modifier validVote(address _voter, address _reviewer) {
    require(reviewIndexPlusOneByReviewer[_reviewer] != 0);
    require(voted[_voter][_reviewer] == false);
    _;
  }

  /*
	* Constructor
  */
  function Store(string _placeID, address _escrowAddress) public {
    placeID = _placeID;
    escrowAddress = _escrowAddress;
  }

  /*
	* Public Functions
  */
  function addReview(string _comment, uint256 _score, address _uploader)
    public
    onlyEscrow
    validScore(_score) {

      if (reviewIndexPlusOneByReviewer[_uploader] != 0){
      	// update review
      	// NOTE: everytime a review gets updated, its last_update will be reset to extend
      	// the active period.
        totalScore = totalScore + _score - allReviews[reviewIndexPlusOneByReviewer[_uploader] - 1].score;
        allReviews[reviewIndexPlusOneByReviewer[_uploader] - 1].comment = _comment;
        allReviews[reviewIndexPlusOneByReviewer[_uploader] - 1].score = _score;
        allReviews[reviewIndexPlusOneByReviewer[_uploader] - 1].last_update = block.timestamp;
      } else {
      	// add new review
        totalReviewAmount = totalReviewAmount + 1;
        totalScore = totalScore + _score;
        Review memory new_review;

        new_review.comment = _comment;
        new_review.score = _score;
        new_review.uploader = _uploader;
        new_review.last_update = block.timestamp;
        allReviews.push(new_review);
        reviewIndexPlusOneByReviewer[_uploader] = totalReviewAmount;
      }
  }

  function voteReview(address _voter, address _reviewer, bool _is_upvote, uint256 _credibility)
    public
    onlyEscrow
    validVote(_voter, _reviewer) {

      voted[_voter][_reviewer] = true;

      // increase all credibility score by 100 (on a scale of 1000)
      // so that vote from new user whose credibility is 0, still amounts to meaningful vote.
      if (_is_upvote){
        allReviews[reviewIndexPlusOneByReviewer[_reviewer] - 1].upvote += 1;
        allReviews[reviewIndexPlusOneByReviewer[_reviewer] - 1].positive_impact += (_credibility+100);
      }
      else{
        allReviews[reviewIndexPlusOneByReviewer[_reviewer] - 1].downvote += 1;
        allReviews[reviewIndexPlusOneByReviewer[_reviewer] - 1].negative_impact += (_credibility+100);
      }

    LogVoteAdded(_voter, _reviewer, _is_upvote);
  }

  function getImpact (address _reviewer)
    public
    constant
    returns(uint256, uint256) {
    return (allReviews[reviewIndexPlusOneByReviewer[_reviewer]-1].positive_impact,
      allReviews[reviewIndexPlusOneByReviewer[_reviewer]-1].negative_impact);
  }

}

contract Escrow{
 	// map user address with its credibility score: [0,1000]
  mapping (address => uint256) public credibility;
  // map reviewer, store with index in vettings array.
  mapping (address => mapping(address => uint256)) public vettingIndex;
  // map reviewer with a list of index for active reviews/vettings
  mapping (address => uint[]) public activeVettingIndexListByUser;
  // map user with claimable reward
  mapping (address => uint256) public settlements;
  // NOTE:non-empty vettings starts at index 1 !!
  Vetting[] public vettings;

  address public storeRegistry;

  struct Vetting{
    address store;
    address reviewer;
    uint256 deposit;
    uint256 last_update;
  }

  /*
	* Constructor
  */
  function Escrow(address _registry) public {
    storeRegistry = _registry;
    // vettings starts at index 1
    vettings.length ++;
  }

  /*
  * Fallback Functions
  */
  function () public
    payable {

  }

  /*
  * Public Functions
  */

  function review(address _store, address _reviewer, string _comment, uint256 _score)
    public
    payable {
      require(noMaturedVetting(_reviewer));
      // if store doesn't exist, if statement would fail and state will revert.
      Store store = Store(_store);

      if (vettingIndex[_reviewer][_store] == 0){
      	// If user send with deposit no less than 0.01 ETH, it will be considered as participating in
      	// peer-review phase which counts them eligible for reward based on votes.
      	// Otherwise, it would just be a normal review.
        require(msg.value >= 10000000000000000);

        Vetting memory newVetting;
        newVetting.store = _store;
        newVetting.reviewer = _reviewer;
        newVetting.deposit = msg.value;
        newVetting.last_update = block.timestamp;

        vettings.push(newVetting);
        vettingIndex[_reviewer][_store] = vettings.length-1;
        activeVettingIndexListByUser[_reviewer].push(vettings.length-1);

        store.addReview(_comment, _score, _reviewer);

      } else {
        // update already submitted review within vetting period and post-vetting
        vettings[vettingIndex[_reviewer][_store]].last_update = block.timestamp;
        store.addReview(_comment, _score, _reviewer);
      }
  }

  // For reviews that doesn't wish to participate in vetting process.
  function noVettingReview (address _store, address _reviewer, string _comment, uint256 _score)
    public {
      Store store = Store(_store);
      store.addReview(_comment, _score, _reviewer);
  }


  function vote(address _store, address _voter, address _reviewer, bool _is_upvote)
  	public {
      require(noMaturedVetting(_voter));
      // NOTE: this version of contract doesn't reward voter.
	    Store store = Store(_store);
      store.voteReview(_voter, _reviewer, _is_upvote, credibility[_voter]);
  }

  function settle(address _reviewer) public{
  	// inspecting all active reviews of this reviewer
  	for (uint i=0; i<activeVettingIndexListByUser[_reviewer].length; i++){
      uint256 index = activeVettingIndexListByUser[_reviewer][i];

  		if (now > vettings[index].last_update + 10 minutes && index != 0){
  			// if the active period (7 days) has passed, then finalized and settled the reward.
        // reward consists of the original deposit from reviewer + base reward 0.001 ether +
        Store store = Store(vettings[index].store);
        uint256 positive_impact;
        uint256 negative_impact;
        (positive_impact, negative_impact) = store.getImpact(_reviewer);
        if (positive_impact >= negative_impact){
          // settle for reviewer
          settlements[_reviewer] += calculateReward(index, positive_impact - negative_impact);
          credibility[_reviewer] = (credibility[_reviewer]*90 + 10000)/100;

        } else {
          // settle for reviewer
          // settlements doesn't change (i.e. no reward, lose initial deposit)
          // credibility of reviewer drop to 0.9 of its original value.
          credibility[_reviewer] = (credibility[_reviewer]*90)/100;
        }
        // delete this settled review from active list
        delete vettingIndex[_reviewer][vettings[index].store];
        delete activeVettingIndexListByUser[_reviewer][i];
        delete vettings[index];
  		}
  	}
  }

  // reviewer could claim settements after calling settle function.
  function claim (address _claimer)
    public {
      uint256 claimable = settlements[_claimer];
      require(claimable > 0);
      // set to zero first to prevent reentry.
      settlements[_claimer] = 0;
      _claimer.transfer(claimable);
  }

  // make sure all finished active reviews are settled (i.e. credibility has been updated)
  // before allowing further review or vote.
  function noMaturedVetting(address _reviewer)
    public
    constant
    returns (bool) {
      for (uint i=0; i< activeVettingIndexListByUser[_reviewer].length; i++){
        // every review has 7 days period for public to vote/vet
        // within 7 days, they are active.
        if (now > vettings[activeVettingIndexListByUser[_reviewer][i]].last_update + 10 minutes && activeVettingIndexListByUser[_reviewer][i] > 0){
          return false;
        }
      }
      return true;
  }

  function activeVettingIndexListLength(address _reviewer)
    public
    constant
    returns (uint256) {
      return activeVettingIndexListByUser[_reviewer].length;
  }

  /*
  * Internal Functions
  */

  function calculateReward (uint256 _index, uint256 _net_vote)
    internal
    returns(uint256) {
      // if _is_positive is true, reward = initial deposit + base reward (0.0001 ether) + _net_vote*(1/1000000) ether.
      // otherwise, no reward, which for reviewer would a loss (initial deposit)
      // NOTE: _net_vote/1000000 is likely to be zero. therefore, we use equivalent _net_vote*100 wei.

      return vettings[_index].deposit + 100000000000000 + _net_vote*1000000000000;
  }
}

contract StoreRegistry{
  mapping (bytes32 => address) public registry;
  address public escrowAddress;

  event LogStoreCreated(address indexed store_address);

  /*
	* Constructor
  */
  function StoreRegistry(){
  	// Create global escrow which process votes and bets on all reviews in any store.
    Escrow escrow = new Escrow(this);
    escrowAddress = address(escrow);
  }

  /*
	* Public Functions
  */

  /// _placeID:unique identifier for each store based on Google Map PlaceID
  function addStore(string _placeID) public {
    require(registry[sha256(_placeID)] == 0x0);

    Store newStore = new Store(_placeID, escrowAddress);
    registry[sha256(_placeID)] = address(newStore);
    LogStoreCreated(address(newStore));
  }

  function getStoreAddress(string _placeID)
    public constant
    returns (address){
      return registry[sha256(_placeID)];
  }

  function storeExist(string _placeID)
    public constant
    returns (bool){
      if (registry[sha256(_placeID)] == 0x0){
        return false;
      } else {
        return true;
      }
  }
}
