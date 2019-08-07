package com.teamonion.tmong.order;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@ToString
public class OrdersUpdateRequest {
    private Long id;
    private String buyerId;
    private boolean paid;
    private boolean made;
    private boolean pickup;

    WebSocketResponse toEntity(boolean valid, String errorMessage) {
        return WebSocketResponse.builder()
                .id(id)
                .buyerId(buyerId)
                .paid(paid)
                .made(made)
                .pickup(pickup)
                .valid(valid)
                .errorMessage(errorMessage)
                .build();
    }
}
