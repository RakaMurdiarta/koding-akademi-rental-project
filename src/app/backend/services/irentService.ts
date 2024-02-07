export interface IRentServices {
  rent(customerId : string , vehicleId : string , from : string , until : string , amountDue : number) : Promise<string> 
}