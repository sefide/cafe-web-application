package com.teamonion.tmong.menu;

import com.teamonion.tmong.security.CheckJwt;
import lombok.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/menus")
@RestController
public class MenuController {
    private static final Logger log = LoggerFactory.getLogger(MenuService.class);

    @NonNull
    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @CheckJwt
    @PostMapping
    public ResponseEntity add(@Valid MenuSaveDto menuSaveDto) {
        return new ResponseEntity<>(menuService.add(menuSaveDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity selectAll(Pageable pageable) {
        return new ResponseEntity<>(menuService.selectAll(pageable), HttpStatus.OK);
    }

    @CheckJwt
    @DeleteMapping("/{menu_id}")
    public ResponseEntity deleteOne(@PathVariable Long menu_id) {
        menuService.deleteByMenuId(menu_id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @CheckJwt
    @PutMapping("/{menu_id}")
    public ResponseEntity updateOne(@PathVariable Long menu_id, @Valid MenuSaveDto menuSaveDto) {
        log.info("Menu updateOne Api call..");
        menuService.updateMenu(menu_id, menuSaveDto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{menu_name}")
    public ResponseEntity selectByName(@PathVariable String menu_name) {
        return new ResponseEntity<>(menuService.selectByName(menu_name), HttpStatus.OK);
    }
}
