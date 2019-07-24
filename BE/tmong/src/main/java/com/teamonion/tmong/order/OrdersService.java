package com.teamonion.tmong.order;

import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.HandleRuntimeException;
import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.member.MemberRepository;
import com.teamonion.tmong.menu.Menu;
import com.teamonion.tmong.menu.MenuController;
import com.teamonion.tmong.menu.MenuRepository;
<<<<<<< HEAD
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
=======
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
>>>>>>> 4bfab7cf5dcaac6cc4b0dd006012231c590cf4fc
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class OrdersService {
    private static Logger log = LoggerFactory.getLogger(MenuController.class);

    @NonNull
    private final OrdersRepository ordersRepository;

    @NonNull
    private final MenuRepository menuRepository;

    @NonNull
    private final MemberRepository memberRepository;

    public void add(OrdersAddRequest ordersAddRequest) {
        // TODO : 총 금액 계산
        // TODO : 주문자 정보
        // TODO : 메뉴 정보

        Member member = memberRepository.findById(ordersAddRequest.getMember_id())
                .orElseThrow(()-> new HandleRuntimeException(GlobalExceptionType.ORDER_MEMBER_NOT_FOUND));

        int amount = 0;

        List<Menu> menuList = new ArrayList<>();

        for (Long id : ordersAddRequest.getMenuIdList()) {
            Menu menu = menuRepository.findById(id)
                    .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));
            menuList.add(menu);
            amount += Integer.valueOf(menu.getPrice());
        }

        log.info("총 가격 : {}", amount);


        //ordersRepository.save(ordersAddRequest.toEntity());
    }

}
