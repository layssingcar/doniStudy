package study.board.service;

import java.util.List;

import study.board.dto.BoardDTO;

public interface BoardService {

	List<BoardDTO> selectBoardList();

	int updateList(List<BoardDTO> boardList);

}
