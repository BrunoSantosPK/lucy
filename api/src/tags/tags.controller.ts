import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { Response } from "express";

@Controller("tags")
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Post()
    async create(@Body() body: CreateTagDto, @Res() res: Response) {
        const send = {status: 200, data: null, message: ""};
        try {
            const tag = await this.tagsService.create(body.name);
            send.data = tag;
        } catch(error) {
            send.status = 500;
            send.message = error.message;
        } finally {
            return res.status(send.status).json(send);
        }
    }

    @Get()
    async getAll(@Res() res: Response) {
        const send = {status: 200, data: null, message: ""};
        try {
            const result = await this.tagsService.getAll();
            send.data = result;
        } catch(error) {
            send.status = 500;
            send.message = error.message;
        } finally {
            return res.status(send.status).json(send);
        }
    }
}