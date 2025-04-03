export interface OpportunityInterface {
  _id: string;
  code: string;
  title: string;
  type: TypeOpportunityInterface;
  publish_date: string;
  close_date: string;
  __v: number;
}

export interface TypeOpportunityInterface {
  _id: string;
  name: string;
  __v: number;
}

export interface AddOpportunityInterface{
  title: string,
  type: string,
  publish_date: string,
  close_date: string
}

export interface OpportunityInterfacevv {
  _id: string;
  title: string;
  type: string; 
  publish_date: string; 
  close_date: string; 
  code: string;
  __v?: number; 
}