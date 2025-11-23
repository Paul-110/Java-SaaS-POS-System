package com.zosh.controller;


import com.zosh.exception.UserException;
import com.zosh.payload.dto.InventoryDTO;
import com.zosh.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/api/inventories")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping
    @PreAuthorize("hasAuthority('STORE_MANAGER')")
    public ResponseEntity<InventoryDTO> create(@RequestBody InventoryDTO dto) throws AccessDeniedException, UserException {
        return ResponseEntity.ok(inventoryService.createInventory(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('STORE_MANAGER')")
    public ResponseEntity<InventoryDTO> update(@PathVariable Long id,
                                               @RequestBody InventoryDTO dto) throws AccessDeniedException, UserException {
        return ResponseEntity.ok(inventoryService.updateInventory(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('STORE_MANAGER')")
    public ResponseEntity<Void> delete(@PathVariable Long id) throws AccessDeniedException, UserException {
        inventoryService.deleteInventory(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(inventoryService.getInventoryById(id));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<InventoryDTO> getInventoryByProduct(
            @PathVariable Long productId) {
        return ResponseEntity.ok(
                inventoryService.getInventoryByProductId(productId)
        );
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<InventoryDTO>> getByBranch(@PathVariable Long branchId) {
        return ResponseEntity.ok(inventoryService.getInventoryByBranch(branchId));
    }

}

