import { Controller,Get,Param,UseGuards,HttpException,HttpStatus,Req,Res } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Body, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateTrackDto } from './dtos/create-track.dto';
import type { Request, Response } from 'express';
import { join } from 'path';
import { existsSync, statSync,createReadStream } from 'fs';

@Controller('tracks')
export class TracksController {
    constructor(private readonly tracksService: TracksService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a music track' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/tracks',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )

    async uploadTrack(
    @UploadedFile() file: Express.Multer.File,
    @Body() CreateTrackDto: CreateTrackDto,
  ) {
    const track = await this.tracksService.create({
      ...CreateTrackDto,
      fileUrl: `/uploads/tracks/${file.filename}`,
    });

    return { message: 'Track uploaded successfully', track };
  }

    @Get('list')
    async findAll() {
      return this.tracksService.findAll();
    }

   @Get(':id/stream')
  async streamTrack(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const track = await this.tracksService.findById(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    this.tracksService.incrementPlayCount(id);

    // Construct the full path
    const filePath = join(process.cwd(), track.fileUrl);

    if (!existsSync(filePath)) {
      throw new HttpException('File not found on server', HttpStatus.NOT_FOUND);
    }

    const stat = statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunkSize = end - start + 1;
      const file = createReadStream(filePath, { start, end });

      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'audio/mpeg',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'audio/mpeg',
      };

      res.writeHead(200, head);
      createReadStream(filePath).pipe(res);
    }
  }


}
