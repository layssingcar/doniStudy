package study.board.service;

import java.util.List;
import java.util.Map;

import study.board.dto.BoardDTO;

public interface BoardService {

	List<BoardDTO> selectBoardList();

	int updateBoardList(List<Map<String, Object>> boardList, List<String> boardId);

}
