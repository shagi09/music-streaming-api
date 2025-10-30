import { Body, Controller, Post,UseGuards,Get } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { addTrackToPlaylistDto, CreatePlaylistDto,removeTrackFromPlaylistDto } from './dtos/createplaylist.dto';
import { CurrentUser } from 'decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('playlist')
export class PlaylistController {
    constructor(private readonly playlistService: PlaylistService){}

    @UseGuards(JwtAuthGuard)
    @Post('createPlaylist')
    async createPlaylist(@CurrentUser('userId') userId: string ,@Body() dto:CreatePlaylistDto){
        return this.playlistService.create(userId,dto.name);
    }

    //@UseGuards(JwtAuthGuard) 
    @Post('addTrackToPlaylist')
    async addTrackToPlaylist(@Body() dto:addTrackToPlaylistDto){
        console.log("playlist:", dto.playlistId)
        console.log("track:", dto.trackId)
        return this.playlistService.addTrackToPlaylist(dto.playlistId,dto.trackId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('removeTrackFromPlaylist')
    async removeTrackFromPlaylist(@Body() dto:removeTrackFromPlaylistDto){
        return this.playlistService.removeTrackFromPlaylist(dto.playlistId,dto.trackId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('playlists')
    async getPlaylists(@CurrentUser('userId') userId: string){
        console.log(userId)
        return this.playlistService.getPlaylists(userId);
    }
}
