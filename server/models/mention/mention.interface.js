class Mention {
  /**
   * @method retrieveData
   * @description Returns data from the API
   * @param companies
   * @return []
   */
  retrieveData() {
    throw new Error("method needs to be implemented");
  }
  /**
   * @method mapDataToUniversalFormat
   * @description Mapping API data to the correct format
   * @param mentions
   * @return Mention []
   */
  mapDataToUniversalFormat() {
    throw new Error("method needs to be implemented");
  }
  /**
   * @method filterMentions
   * @description Filtering and returning today mentions
   * @param mentions
   * @return Mention []
   */
  filterMentions() {
    throw new Error("method needs to be implemented");
  }
  /**
   * @method compareTodaysMentionsWithDbMentions
   * @description compare API mentions with DB mentions and returns the new ones
   * @param mentions todayMentionsFromDb
   * @return Mention []
   */
  compareTodaysMentionsWithDbMentions() {
    throw new Error("method needs to be implemented");
  }
  /**
    * @method getImageUrl
    * @description returns an Image 
    * @param mentions 
    ] 
    */
  getImageUrl() {
    throw new Error("method needs to be implemented");
  }
  /**
     * @method saveAllMentionsToDb
     *@description saving each mention to the DB 
     /@param mentions 
     *
]*/
  saveAllMentionsToDb() {
    throw new Error("method needs to be implemented");
  }
}

module.exports = Mention