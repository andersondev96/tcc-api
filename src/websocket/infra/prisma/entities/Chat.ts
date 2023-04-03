
export class Chat {
  id: string;
  name?: string;
  text: string;
  user_id: string;
  company_id: string;
  chatroom_id: string;

  constructor({ id, name, text, user_id, company_id, chatroom_id }: Chat) {
    return Object.assign(this, {
      id,
      name,
      text,
      user_id,
      company_id,
      chatroom_id
    });
  }
}