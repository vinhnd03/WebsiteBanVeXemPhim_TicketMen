package nhom3.datn.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ShowtimeController {
    @RequestMapping("/showtime")
    public String list(){
        return "showtime/list";
    }
}