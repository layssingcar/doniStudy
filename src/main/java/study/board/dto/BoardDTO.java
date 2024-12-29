package study.board.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BoardDTO /* extends ComDefaultVO implements Serializable */ {
	
	/*
	 * @JsonProperty
	 * Jackson 라이브러리에서 제공하는 어노테이션으로, 
	 * JSON 필드 이름과 Java 객체 이름이 다를 경우 객체 간의 매핑을 커스터마이징 할 때 사용
	 */

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
