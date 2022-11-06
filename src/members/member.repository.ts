import { EntityRepository, Repository } from 'typeorm';
import { Member } from './member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { MemberStatus } from './member-status.enum';

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {
  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    const { name, number, status } = createMemberDto;
    const member = this.create({
      name,
      number,
      status: MemberStatus.NON_SUBSCRIBE,
    });

    await this.save(member);
    return member;
  }
}
