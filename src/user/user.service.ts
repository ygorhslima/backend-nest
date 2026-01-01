import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './user.interface';

@Injectable()
export class UserService {
  // Tipando a array com o seu DTO
  private users: UserDto[] = [
    { id: 1, name: 'Alice Silva', email: 'alice@email.com', role: 'admin' },
    { id: 2, name: 'Bruno Costa', email: 'bruno@email.com', role: 'user' },
    { id: 3, name: 'Carla Souza', email: 'carla@email.com', role: 'user' },
  ];

  findAll(): UserDto[] {
    return this.users;
  }

  findOne(id: number): UserDto {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  create(userData: UserDto): UserDto {
    const newUser = {
      ...userData,
      // Se o DTO não trouxer ID, geramos um aqui
      id:
        userData.id ||
        (this.users.length > 0
          ? Math.max(...this.users.map((u) => u.id)) + 1
          : 1),
    };

    this.users.push(newUser);
    return newUser;
  }

  // Usamos Partial<UserDto> para permitir atualizar apenas alguns campos
  update(id: number, updateData: Partial<UserDto>): UserDto {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    // Mescla os dados existentes com as atualizações, garantindo que o ID não mude
    this.users[userIndex] = { ...this.users[userIndex], ...updateData, id };
    return this.users[userIndex];
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    this.users.splice(userIndex, 1);
    return { deleted: true, id };
  }
}
