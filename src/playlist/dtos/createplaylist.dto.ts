import { ApiProperty } from "@nestjs/swagger";

export class CreatePlaylistDto {
    @ApiProperty()
    name: string;
}

export class addTrackToPlaylistDto {
    @ApiProperty()
    playlistId: string;
    @ApiProperty()
    trackId: string;
}

export class removeTrackFromPlaylistDto {
    @ApiProperty()
    playlistId: string;
    @ApiProperty()
    trackId: string;
}