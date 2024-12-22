package egovframework.com.cmm;

import java.io.Serializable;
import java.util.Locale;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * @Class Name : ComDefaultVO.java
 * @Description : ComDefaultVO class
 * @Modification Information
 * @
 * @  수정일         수정자                   수정내용
 * @ -------    --------    ---------------------------
 * @ 2009.02.01    조재영         최초 생성
 *
 *  @author 공통서비스 개발팀 조재영
 *  @since 2009.02.01
 *  @version 1.0
 *  @see 
 *  
 */
@SuppressWarnings("serial")
public class ComDefaultVO implements Serializable {
	
	/** 검색조건 */
    private String searchCondition = "";
    
    /** 검색Keyword */
    private String searchKeyword = "";
    
    /** 검색사용여부 */
    private String searchUseYn = "";
    
    /** 현재페이지 */
    private int pageIndex = 1;
    
    /** 페이지갯수 */
    private int pageUnit = 10;
    
    /** 페이지사이즈 */
    private int pageSize = 10;

    /** firstIndex */
    private int firstIndex = 1;

    /** lastIndex */
    private int lastIndex = 1;

    /** recordCountPerPage */
    private int recordCountPerPage = 10;
    
    /** 검색KeywordFrom */
    private String searchKeywordFrom = "";    

	/** 검색KeywordTo */
    private String searchKeywordTo = "";
    
    /** 언어 코드 */
    private String langCode = "";
    
    /** 리비전 ID */
   	private String rev_revisionId; 

       /** 리비전 ID */
   	private String rev_revisionVer; 
   	
   	private String screenId_;
   	
   	private String edit_version_flag;
   	
   	private String valid_version_flag;
       /** 리비전 ID */
   	private String rev_state; 
   	
   	private String create_user_id_;
   	
   	private String create_date_;
   	
   	private String last_update_user_id_;
   	
   	private String last_update_date_;
   	
   	private String isSave = "N";

    /** 삭제 flag */
	private String isDelete = "N";
    
	public int getFirstIndex() {
		return firstIndex;
	}

	public void setFirstIndex(int firstIndex) {
		this.firstIndex = firstIndex;
	}

	public int getLastIndex() {
		return lastIndex;
	}

	public void setLastIndex(int lastIndex) {
		this.lastIndex = lastIndex;
	}

	public int getRecordCountPerPage() {
		return recordCountPerPage;
	}

	public void setRecordCountPerPage(int recordCountPerPage) {
		this.recordCountPerPage = recordCountPerPage;
	}

	public String getSearchCondition() {
        return searchCondition;
    }

    public void setSearchCondition(String searchCondition) {
        this.searchCondition = searchCondition;
    }

    public String getSearchKeyword() {
        return searchKeyword;
    }

    public void setSearchKeyword(String searchKeyword) {
        this.searchKeyword = searchKeyword;
    }

    public String getSearchUseYn() {
        return searchUseYn;
    }

    public void setSearchUseYn(String searchUseYn) {
        this.searchUseYn = searchUseYn;
    }

    public int getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }

    public int getPageUnit() {
        return pageUnit;
    }

    public void setPageUnit(int pageUnit) {
        this.pageUnit = pageUnit;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    
    /**
	 * searchKeywordFrom attribute를 리턴한다.
	 * @return String
	 */
	public String getSearchKeywordFrom() {
		return searchKeywordFrom;
	}

	/**
	 * searchKeywordFrom attribute 값을 설정한다.
	 * @param searchKeywordFrom String
	 */
	public void setSearchKeywordFrom(String searchKeywordFrom) {
		this.searchKeywordFrom = searchKeywordFrom;
	}

	/**
	 * searchKeywordTo attribute를 리턴한다.
	 * @return String
	 */
	public String getSearchKeywordTo() {
		return searchKeywordTo;
	}

	/**
	 * searchKeywordTo attribute 값을 설정한다.
	 * @param searchKeywordTo String
	 */
	public void setSearchKeywordTo(String searchKeywordTo) {
		this.searchKeywordTo = searchKeywordTo;
	}
	
	public String getLangCode() {
		if(StringUtils.isEmpty(langCode))
			return Locale.getDefault().getLanguage();
		return langCode;
	}

	public void setLangCode(String langCode) {
		this.langCode = langCode;
	}

	public String getRev_revisionId() {
		return rev_revisionId;
	}

	public void setRev_revisionId(String rev_revisionId) {
		this.rev_revisionId = rev_revisionId;
	}

	public String getRev_revisionVer() {
		return rev_revisionVer;
	}

	public void setRev_revisionVer(String rev_revisionVer) {
		this.rev_revisionVer = rev_revisionVer;
	}

	public String getScreenId_() {
		return screenId_;
	}

	public void setScreenId_(String screenId_) {
		this.screenId_ = screenId_;
	}

	public String getEdit_version_flag() {
		return edit_version_flag;
	}

	public void setEdit_version_flag(String edit_version_flag) {
		this.edit_version_flag = edit_version_flag;
	}

	public String getValid_version_flag() {
		return valid_version_flag;
	}

	public void setValid_version_flag(String valid_version_flag) {
		this.valid_version_flag = valid_version_flag;
	}

	public String getRev_state() {
		return rev_state;
	}

	public void setRev_state(String rev_state) {
		this.rev_state = rev_state;
	}

	public String getCreate_user_id_() {
		return create_user_id_;
	}

	public void setCreate_user_id_(String create_user_id_) {
		this.create_user_id_ = create_user_id_;
	}

	public String getCreate_date_() {
		return create_date_;
	}

	public void setCreate_date_(String create_date_) {
		this.create_date_ = create_date_;
	}

	public String getLast_update_user_id_() {
		return last_update_user_id_;
	}

	public void setLast_update_user_id_(String last_update_user_id_) {
		this.last_update_user_id_ = last_update_user_id_;
	}

	public String getLast_update_date_() {
		return last_update_date_;
	}

	public void setLast_update_date_(String last_update_date_) {
		this.last_update_date_ = last_update_date_;
	}

	public String getIsSave() {
		return isSave;
	}

	public void setIsSave(String isSave) {
		this.isSave = isSave;
	}

	public String getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(String isDelete) {
		this.isDelete = isDelete;
	}
}
