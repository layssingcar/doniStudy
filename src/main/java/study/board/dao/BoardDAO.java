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

	public int updateBoardList(BoardDTO board) {
		return sqlSession.update("boardDAO.updateBoardList", board);
	}
	
	public int insertBoardList(BoardDTO board) {
		return sqlSession.insert("boardDAO.insertBoardList", board);
	}

	public int deleteBoardList(List<String> boardId) {
		return sqlSession.delete("boardDAO.deleteBoardList", boardId);
	}

	public List<String> getCheckboxList() {
		return sqlSession.selectList("boardDAO.getCheckboxList");
	}
	
}
