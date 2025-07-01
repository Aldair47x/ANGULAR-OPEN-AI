export interface iMessage {
  isGpt: boolean;
  text: string;
  userScore?: number;
  errors?: any[];
}
