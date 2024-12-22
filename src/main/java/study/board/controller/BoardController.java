package study.board.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import study.board.dto.BoardDTO;
import study.board.service.BoardService;

@RestController
public class BoardController {
	
	@Resource(name="BoardService")
	private BoardService boardService;
	
	// 게시글 목록 조회
	@RequestMapping(value="/board/selectList", method=RequestMethod.GET, produces="application/json; charset=utf8")
	public String selectList() throws Exception {
		
		List<BoardDTO> boardList = boardService.selectBoardList();
		
		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(boardList);
	}
	
	// 게시글 목록 저장
	@RequestMapping(value="/board/updateList", method=RequestMethod.PUT)
	public String updateList(@RequestBody List<BoardDTO> boardList) throws Exception {

		int result = boardService.updateList(boardList);
		return result + "";
	}
	
}
