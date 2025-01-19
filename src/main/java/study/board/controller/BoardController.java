package study.board.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import study.board.dto.BoardDTO;
import study.board.service.BoardService;

/*
 * @RestController
 * RESTful 웹 서비스를 구현하기 위해 사용되며, 
 * @Controller와 @ResponseBody를 결합한 역할 수행
 * 
 * @Resource
 * 스프링 컨테이너에서 관리하는 빈을 해당 필드 또는 메서드에 주입
 * @Autowired와 비슷한 역할을 하지만, @Autowired는 타입 기반으로 매칭하고 @Resource는 이름 기반으로 매칭
 */

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
	
	// 게시글 목록 저장 (추가, 수정, 삭제)
	@RequestMapping(value="/board/updateList", method=RequestMethod.PUT)
	public String updateBoardList(@RequestBody Map<String, Object> paramMap) throws Exception {
		
		List<Map<String, Object>> boardList = (List<Map<String, Object>>)paramMap.get("dataList"); // 추가, 수정 데이터
		List<String> boardId = (List<String>)paramMap.get("selRowsBoardId"); // 선택된 행의 아이디 값 (삭제)
		
		int result = boardService.updateBoardList(boardList, boardId);
		return result + "";
	}
	
	@RequestMapping(value="/getCheckboxList")
	public List<String> getCheckboxList() {
		return boardService.getCheckboxList();
	}
	
}
