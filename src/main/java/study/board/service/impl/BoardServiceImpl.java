package study.board.service.impl;

import java.util.List;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import study.board.dao.BoardDAO;
import study.board.dto.BoardDTO;
import study.board.service.BoardService;

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
	public int updateList(List<BoardDTO> boardList) {
		
		for(BoardDTO board: boardList) {
			int result = boardDAO.updateBoard(board);
			
			// 한 행이라도 수정 실패 시 예외 발생
			if(result == 0) throw new IllegalArgumentException("수정 실패");
		}
		
		return boardList.size();
	}
	
}
