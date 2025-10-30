import { Body, Controller,Post,UseGuards,Delete ,Get} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'decorators/user.decorator';
import { AddFavoriteDto, RemoveFavoriteDto } from './dtos/favorites.dto';

@Controller('favorites')
export class FavoritesController {
    constructor (private readonly favoritesService: FavoritesService) {}

    @Post('add-favorites')
    @UseGuards(JwtAuthGuard)
    async addFavorites(
        @CurrentUser('userId') userId: string,
        @Body() dto: AddFavoriteDto
    ) {
        return this.favoritesService.addFavorite(userId, dto.trackId);

    }

    @Delete('delete-favorites')
    @UseGuards(JwtAuthGuard)
    async removeFavorites(
        @CurrentUser('userId') userId: string,
        @Body() dto: RemoveFavoriteDto
    ) {
        return this.favoritesService.removeFavorite(userId, dto.trackId);

    }

    @Get('get-favorites')
    @UseGuards(JwtAuthGuard)
    async getFavorites(@CurrentUser('userId') userId: string) {
        return this.favoritesService.getUserFavorites(userId);
    }

}
