package com.zosh.service;


import com.zosh.exception.UserException;
import com.zosh.payload.dto.InventoryDTO;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface InventoryService {
    InventoryDTO createInventory(InventoryDTO dto) throws AccessDeniedException, UserException;
    InventoryDTO updateInventory(Long id, InventoryDTO dto) throws AccessDeniedException, UserException;
    void deleteInventory(Long id) throws AccessDeniedException, UserException;
    InventoryDTO getInventoryById(Long id);
    InventoryDTO getInventoryByProductId(Long productId);
    List<InventoryDTO> getInventoryByBranch(Long branchId);

}

