import { TreeUser } from './TreeUser';
import { TreeDept } from './TreeDept';
import { Member } from './Member';

export type SelectTree = {
  owner: string; // 채팅방 주인
  checkOutAuthList: TreeUser[]; // 리비전 permission 가진 멤버 리스트
  checkoutDeptAuthList: TreeDept[]; // 리비전 permission 가진 부서 리스트 
  viewAuthList:TreeUser[]; // 열람 권한 가진 멤버 리스트
  viewAuthDeptList: TreeDept[]; // 열람 권한 가진 부서 리스트
  members: TreeUser[]; // 현재 대화방에 참여중인 멤버 리스트
};
  