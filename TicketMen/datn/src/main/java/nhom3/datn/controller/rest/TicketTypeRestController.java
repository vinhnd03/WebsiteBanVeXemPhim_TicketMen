package nhom3.datn.controller.rest;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import nhom3.datn.service.TicketTypeService;



@CrossOrigin("*")
@RestController
@RequestMapping("/rest/ticketTypes")
public class TicketTypeRestController {
    @Autowired
    TicketTypeService ticketTypeService;

    
}
