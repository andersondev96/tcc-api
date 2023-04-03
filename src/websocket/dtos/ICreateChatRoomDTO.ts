import { UserCreateNestedManyWithoutChatRoomInput, UserUncheckedCreateNestedManyWithoutChatRoomInput } from "@prisma/client";

export interface ICreateChatRoomDTO {
  id: string;
  idUsers: UserUncheckedCreateNestedManyWithoutChatRoomInput[] | UserCreateNestedManyWithoutChatRoomInput[];
}
