package com.teamonion.tmong.member;

import com.teamonion.tmong.component.JwtComponent;
import com.teamonion.tmong.exception.MemberNotFoundException;
import com.teamonion.tmong.exception.PasswordMismatchException;
import com.teamonion.tmong.exception.ValidCustomException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberService {
    private static final Logger log = LoggerFactory.getLogger(MemberService.class);

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private JwtComponent jwtComponent;

    @Transactional
    public Member save(MemberSignUpRequest memberSignUpRequest) {
        if(isOverlap(memberSignUpRequest.getMemberId())) {
            throw new ValidCustomException("memberId", "이미 사용중인 아이디입니다");
        }
        return memberRepository.save(memberSignUpRequest.toEntity());
    }

    public Member findByMemberId(String memberId) {
        return memberRepository.findByMemberId(memberId).orElseThrow(MemberNotFoundException::new);
    }

    public MemberLoginResponse login(MemberLoginRequest memberLoginRequest) {
        Member member = findByMemberId(memberLoginRequest.getMemberId());

        if(!member.match(memberLoginRequest.getPassword())){
            throw new PasswordMismatchException();
        }
        return new MemberLoginResponse(member.getPoint(), jwtComponent.createToken(member));
    }

    public boolean isOverlap(String memberId) {
        if(memberRepository.findByMemberId(memberId).isPresent()) {
            return true;
        }
        return false;
    }
}
