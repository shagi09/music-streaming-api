import { ApiProperty } from "@nestjs/swagger";
export class AddFavoriteDto {
    @ApiProperty()
    trackId: string;
}

export class RemoveFavoriteDto {
    @ApiProperty()
    trackId: string;
}