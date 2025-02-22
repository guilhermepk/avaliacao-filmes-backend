import { ListEntity } from "src/list/models/entities/list.entity";
import { UserEntity } from "src/user/models/entities/user.entity";

export class CreateUserListDto {
    constructor(user: UserEntity, list: ListEntity){
        this.user = user;
        this.list = list;
    }

    user: UserEntity;
    list: ListEntity;
}