

export interface Event {

    id: number,
    Team1: string,
    Team2: string,
    Status: string,
    Venue: string,
    ResultUrl: string,
    Description: string,
    eventDate: string,
    createdAt: string,
    updatedAt: string


}

export interface UserDetail {
    balance: number,
    createdAt:string,
    email:string,
    id:number,
    name:string,
    profilepicture:string,
    updatedAt:string,
    votes : Vote[] 
}






export interface UserDashboardDetail {
    balance: number;
    createdAt: string; // You can use Date if you want to parse it to a Date object
    email: string;
    id: number;
    name: string;
    profilepicture: string;
    updatedAt: string;
    votes: Vote[];
  }
  
  interface Vote {
    amount: number;
    createdAt: string;
    event: Event2;
    eventId: number;
    id: number;
    predicted: string;
    updatedAt: string;
    userid: number;
    status : string 
  }
  
  interface Event2 {
    Description: string;
    ResultUrl: string;
    Status: string;
    Team1: string;
    Team2: string;
    Venue: string;
    createdAt: string;
    eventDate: string;
    id: number;
    updatedAt: string;
  }
  