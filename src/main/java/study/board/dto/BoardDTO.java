package study.board.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BoardDTO /* extends ComDefaultVO implements Serializable */ {

	/* board_id */
	@JsonProperty("boardId")
	private String boardId;
	
	/* board_title */
	@JsonProperty("boardTitle")
	private String boardTitle;
	
	/* board_content */
	@JsonProperty("boardContent")
	private String boardContent;
	
	/* writer_id */
	@JsonProperty("writerId")
	private String writerId;

	public String getBoardId() {
		return boardId;
	}

	public void setBoardId(String boardId) {
		this.boardId = boardId;
	}

	public String getBoardTitle() {
		return boardTitle;
	}

	public void setBoardTitle(String boardTitle) {
		this.boardTitle = boardTitle;
	}

	public String getBoardContent() {
		return boardContent;
	}

	public void setBoardContent(String boardContent) {
		this.boardContent = boardContent;
	}

	public String getWriterId() {
		return writerId;
	}

	public void setWriterId(String writerId) {
		this.writerId = writerId;
	}
	
}
