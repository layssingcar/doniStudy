package study.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

	@GetMapping("/tuiGrid")
	public String temp() {
		return "tuiGrid";
	}
	
}