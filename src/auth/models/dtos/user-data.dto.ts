export class UserDataDto {
    constructor(id: number, name: string, nickname: string) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
    }

    id: number;
    name: string;
    nickname: string;
}