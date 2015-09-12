import { Actions } from 'minimal-flux'
import * as KarmaAPI from '../sources/karma_api'

export default class DealActions extends Actions {
  create(newDeals) {
    var p = KarmaAPI.postDeals(newDeals)
    p.then(deals => {
      if (deals) {
        this.dispatch('create', deals)
      }
      else{
        console.warn('No Deals returned')
      }

    }).catch(this.createError)
  } 

  getDeals(){
    var p = KarmaAPI.getDeals()
      p.then(deals => {
        if (deals) {
          this.dispatch('getDeals', deals)
        }
        else{
          console.warn('No Deals Returned')
        }
      }).catch(this.createError)
  }

  updateDeals(changedDeals) {
    var p = KarmaAPI.updateDeals(changedDeals)
    p.then(deals => {
      if (deals) {
        this.dispatch('updateDeals', deals)
      }
      else{
        console.warn('Updated Deals Not Returned')
      }
    }).catch(this.createError)
  }

  deleteDeal(deal) {
    var p = KarmaAPI.deleteDeal(deal)
    p.then(deal => {
      if (deal) {
        this.dispatch('deleteDeal', deal)
      }
      else{
        console.warn('Delete was not successful')
      }
    }).catch(this.deleteError)
  }

  createRedemption(router, redemptionData) {
    KarmaAPI.postNewRedemption(redemptionData).then(redemption => {
      if (redemption) {
        this.dispatch('createRedemption', redemption)
        return router.transitionTo('redeem_success', {paymentId: redemption.paymentId, organizationId: redemption.organizationId, dealId: redemption.dealId})
      }
      console.warn('Redemption was not returned from createRedemption')
    }).catch(this.createError)
  }

  getRedemptions(){
    var p = KarmaAPI.getRedemptions()
    p.then(redemptions => {
      if (redemptions) {
        this.dispatch('getRedemptions', redemptions)
      }
      else{
        console.warn('No Redemptions Returned')
      }
    }).catch(this.createError)
  }

  getSurveyQuestions(){
    var p = KarmaAPI.getSurveyQuestions()
    p.then(questions => {
      if (questions) {
        this.dispatch('getSurveyQuestions', questions)
      }
      else {
        console.warn('No Questions Returned')
      }
    }).catch(this.createError)
  }

  createSurveyResponse(newSurveyResponse, router, whereTo){
    var p = KarmaAPI.postNewSurveyResponse(newSurveyResponse)
    p.then(surveyResponse => {
      if(surveyResponse) {
        this.dispatch('createSurveyResponse', surveyResponse)
        return router 
          ? router.transitionTo(whereTo)
          : null
      }
      else {
        console.warn('No Responses Returned')
      }
    }).catch(this.createError)
  }

  getSurveyResponses(){
    var p = KarmaAPI.getSurveyResponses()
    p.then(surveyResponses => {
      if (surveyResponses) {
        this.dispatch('getSurveyResponses', surveyResponses)
      }
      else {
        console.warn('No survey responses Returned')
      }
    }).catch(this.createError)
  }

  createError(error) {
    console.warn(error)
    this.dispatch('createError', error)
  }

  deleteError(error) {
    console.warn(error)
    this.dispatch('deleteError', error)
  }
}
