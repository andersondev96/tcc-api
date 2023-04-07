
export interface ICreateChatDTO {
  id: string;
  name?: string;
  text: string;
  chatroom_id: string;
  connection_id: string;
}