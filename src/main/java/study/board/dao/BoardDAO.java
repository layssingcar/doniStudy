package study.board.dao;

import java.util.List;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import study.board.dto.BoardDTO;

@Repository("BoardDAO")
public class BoardDAO /* extends EgovComAbstractDAO */ {

	@Resource(name="sqlSessionTemplate")
	private SqlSessionTemplate sqlSession;
	
	public List<BoardDTO> selectBoardList() {
		return sqlSession.selectList("boardDAO.selectBoardList");
	}

	public int updateBoard(BoardDTO board) {
		return sqlSession.update("boardDAO.updateBoard", board);
	}
	
}
