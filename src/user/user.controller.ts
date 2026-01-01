import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.interface';

@Controller('user')
export class UserController {
  // Injeção de dependência do Service
  constructor(private readonly userService: UserService) {}

  // 1. Listar todos os usuários
  @Get()
  findAll(): UserDto[] {
    return this.userService.findAll();
  }

  // 2. Buscar um usuário por ID
  // ParseIntPipe garante que o ID da URL seja convertido de string para number automaticamente
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): UserDto {
    return this.userService.findOne(id);
  }

  // 3. Criar um novo usuário
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() userData: UserDto): UserDto {
    return this.userService.create(userData);
  }

  // 4. Atualizar um usuário
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<UserDto>,
  ): UserDto {
    return this.userService.update(id, updateData);
  }

  // 5. Deletar um usuário
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
