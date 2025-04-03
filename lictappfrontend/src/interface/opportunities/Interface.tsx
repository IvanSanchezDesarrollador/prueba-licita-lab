export interface OpportunityInterface {
  _id: string;
  code: string;
  title: string;
  type: TypeOpportunityInterface;
  publish_date: string; // Puedes usar Date si prefieres manejarlo como objeto de fecha
  close_date: string; // Lo mismo aquí
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
  type: string; // Suponiendo que es un ID de referencia a otro documento
  publish_date: string; // Podría ser Date si deseas manejarlo como objeto de fecha
  close_date: string; // Podría ser Date también
  code: string;
  __v?: number; // Opcional, ya que MongoDB lo usa para control de versiones
}