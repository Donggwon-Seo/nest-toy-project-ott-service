import {
  Body,
  Controller,
  Delete,
  Get, Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './member.entity';
import { MemberStatusValidationPipe } from './pipes/member-status-validation.pipe';
import { MemberStatus } from './member-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('members')
@UseGuards(AuthGuard()) // 인증된 유저만 회원 정보를 보거나 수정 가능
export class MembersController {
  private logger = new Logger('Members');
  constructor(private membersService: MembersService) {} // dependency injection(의존성 주입)

  @Post() // 회원 정보 생성 기능
  @UsePipes(ValidationPipe) // 파이프를 이용한 유효성 체크
  createMember(
    @Body() createMemberDto: CreateMemberDto,
    @GetUser() user: User, // 회원 정보를 생성할 때, 생성한 유저(관리자) 정보 넣어주기
  ): Promise<Member> {
    // 로그 남기기
    this.logger.verbose(`User ${user.username} creating a new board. 
    Payload: ${JSON.stringify(createMemberDto)}`);
    return this.membersService.createMember(createMemberDto, user);
  }

  @Get() // 해당 관리자가 생성한 모든 회원 정보를 가져오는 기능
  getAllMembers(@GetUser() user: User): Promise<Member[]> {
    //로그 남기기, 로그 객체를 남기면 됨
    this.logger.verbose(`User ${user.username} trying to get all members`);
    return this.membersService.getAllMembers(user);
  }

  @Get('/:id') // 특정 ID의 회원 정보를 가져오는 기능
  getMemberById(@Param('id') id: number): Promise<Member> {
    return this.membersService.getMemberById(id);
  }

  @Delete('/:id')
  deleteMember(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<void> {
    return this.membersService.deleteMember(id, user);
  }
  @Patch('/:id/status') // 특정 ID에 대한 회원 상태 수정
  updateMemberStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', MemberStatusValidationPipe) status: MemberStatus,
  ) {
    return this.membersService.updateMemberStatus(id, status);
  }
}
