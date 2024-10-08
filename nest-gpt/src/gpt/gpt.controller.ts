import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto } from './dto/orthography.dto';


@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(
    @Body() orthographyDto: OrthographyDto,
  ) {
    return this.gptService.orthographyCheck(orthographyDto);
  }
}
