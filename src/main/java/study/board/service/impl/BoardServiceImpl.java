package study.board.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import study.board.dao.BoardDAO;
import study.board.dto.BoardDTO;
import study.board.service.BoardService;

/*
 * ObjectMapper
 * Jackson 라이브러리에서 제공하는 클래스로, 
 * Java 객체와 JSON 데이터를 변환하는 데 사용
 */

@Service("BoardService")
public class BoardServiceImpl implements BoardService{
	
	@Resource(name="BoardDAO")
	private BoardDAO boardDAO;
	
	@Override
	public List<BoardDTO> selectBoardList() {
		return boardDAO.selectBoardList();
	}
	
	@Transactional
	@Override
	public int updateBoardList(List<Map<String, Object>> boardList, List<String> boardId) {
		
		for (Map<String, Object> map : boardList) {
			
			ObjectMapper objectMapper = new ObjectMapper();
			map.remove("id"); // jqGrid Checkbox 번호 값 제거
			BoardDTO board = new BoardDTO();
			board.setBoardId((String)map.get("boardId"));
			board.setBoardTitle((String)map.get("boardTitle"));
			board.setBoardContent((String)map.get("boardContent"));
			board.setWriterId((String)map.get("writerId"));
			
			int result = boardDAO.updateBoardList(board);
			
			// 수정된 데이터가 없을 경우 데이터 추가
			if (result == 0 && board.getBoardTitle() != null && board.getBoardContent() != null && board.getWriterId() != null) {
				result = boardDAO.insertBoardList(board);
			}
			
			// 수정, 추가 모두 실패 시 예외 발생
			if (result == 0) {
				throw new IllegalArgumentException("수정 실패");
			}
		}
		
		// 선택된 행 데이터 삭제
		int result = 0;
		if (boardId != null && !boardId.isEmpty()) {
			result = boardDAO.deleteBoardList(boardId);
		}
		
		// 삭제 실패 시 예외 발생
		if (boardId != null && result == 0) {
			throw new IllegalArgumentException("삭제 실패");
		}
		
		return boardList.size();
	}
	
}
