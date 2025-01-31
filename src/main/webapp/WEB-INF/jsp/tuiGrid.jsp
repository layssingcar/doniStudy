<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Toast UI Grid</title>
    <link rel="stylesheet" href="https://uicdn.toast.com/tui-grid/latest/tui-grid.css">
    <script src="https://uicdn.toast.com/tui-grid/latest/tui-grid.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="/css/grid.css">
    <script src="/js/tuiGrid.js" defer></script>
</head>
<body>
    <div class="grid-container">
        <div class="grid-table">
            <!-- 검색 컴포넌트 -->
            <div class="search-compo">
                <input type="text" class="search-input">
                <button class="btn search-btn">검색</button>
            </div>

            <div>
                <!-- 버튼 컨테이너 -->
                <div class="grid-btn"></div>
        
                <!-- Toast UI Grid 테이블 -->
                <div id="grid"></div>
            </div>
        </div>

        <!-- 선택 옵션 -->
        <div class="options">
            <!-- Editable -->
            <div id="gridEditableYn">
                <label class="title-label">Editable</label>
                <input type="radio" id="gridEditableYnY" name="gridEditableYn" value="Y" checked>
                <label for="gridEditableYnY">예</label>
                <input type="radio" id="gridEditableYnN" name="gridEditableYn" value="N">
                <label for="gridEditableYnN">아니오</label>
            </div>
            <!-- 순번 -->
            <div class="option-group">
                <div>
                    <input type="checkbox" id="rowNumY" value="rowNumY">
                    <label for="rowNumY">순번</label>
                </div>
                <!-- 순번 정렬 -->
                <div class="sub-option" id="rowNumOrder" style="display: none;">
                    <label class="title-label">순번 정렬</label>
                    <input type="radio" id="rowNumOrderasc" name="rowNumOrder" value="asc" checked>
                    <label for="rowNumOrderasc">ASC</label>
                    <input type="radio" id="rowNumOrderdesc" name="rowNumOrder" value="desc">
                    <label for="rowNumOrderdesc">DESC</label>
                </div>
            </div>
            <!-- 선택 유형 -->
            <div>
                <label class="title-label">선택 유형</label>
                <div class="option-title">
                    <div class="option-list">
                        <input type="radio" id="selectTyperadio" name="selectType" value="radio">
                        <label for="selectTyperadio">Single</label>
                    </div>
                    <div class="option-list">
                        <input type="radio" id="selectTypecheckbox" name="selectType" value="checkbox">
                        <label for="selectTypecheckbox">Multi</label>
                    </div>
                    <div class="option-list">
                        <input type="radio" id="selectTypenone" name="selectType" value="none" checked>
                        <label for="selectTypenone">None</label>
                    </div>
                </div>
            </div>
            <!-- 버튼 -->
            <div>
                <label class="title-label">버튼</label>
                <div class="option-title">
                    <div class="option-list">
                        <input type="checkbox" id="useButtongrid-add" value="ellipsisY">
                        <label for="useButtongrid-add">추가</label>
                    </div>
                    <div class="option-list">
                        <input type="checkbox" id="useButtongrid-delete" value="ellipsisY">
                        <label for="useButtongrid-delete">삭제</label>
                    </div>
                    <div class="option-list">
                        <input type="checkbox" id="useButtongrid-copy" value="ellipsisY">
                        <label for="useButtongrid-copy">복사</label>
                    </div>
                    <div class="option-list">
                        <input type="checkbox" id="useButtongrid-save" value="ellipsisY">
                        <label for="useButtongrid-save">저장</label>
                    </div>
                    <div class="option-group">
                        <div>
                            <input type="checkbox" id="useButtongrid-upDown" value="Y">
                            <label for="useButtongrid-upDown">Up/Down</label>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 행 추가 위치 -->
            <div>
                <label class="title-label">행 추가 위치</label>
                <div class="option-title">
                    <div class="option-list">
                        <input type="radio" id="addRowAttop" name="addRowAt" value="top">
                        <label for="addRowAttop">상단</label>
                    </div>
                    <div class="option-list">
                        <input type="radio" id="addRowAtbottom" name="addRowAt" value="bottom" checked>
                        <label for="addRowAtbottom">하단</label>
                    </div>
                </div>
            </div>
            <!-- 말줄임표 ('...'표시) -->
            <div>
                <input type="checkbox" id="ellipsisY" value="Y">
                <label for="ellipsisY">말줄임표 ('...'표시)</label>
            </div>
            <!-- 전체 건 수 표시 -->
            <div>
                <input type="checkbox" id="totalCountYnY" value="Y">
                <label for="totalCountYnY">전체 건 수 표시</label>
            </div>
            <!-- 페이징 사용 -->
            <div class="option-group">
                <div>
                    <input type="checkbox" id="pagingYnY" value="Y">
                    <label for="pagingYnY">페이징 사용</label>
                </div>
                <div class="sub-option" id="pagingOption" style="display: none;">
                    <!-- 페이징 행 설정 -->
                    <div class="option-list option-item input-option">
                        <label for="pagingRowSetting" class="title-label">페이징 행 설정</label>
                        <select id="pagingRowSetting">
                            <option value="1" selected>직접입력</option>
                            <option value="2">선택목록</option>
                        </select>
                    </div>
                    <!-- 페이징 당 행 개수 -->
                    <div class="option-list option-item input-option rowSize">
                        <label for="rowSize" class="title-label">페이징 당 행 개수</label>
                        <input type="number" id="rowSize" value="10">
                    </div>
                    <!-- 페이징 수 -->
                    <div class="option-list option-item input-option">
                        <label for="pageCount" class="title-label">페이징 수</label>
                        <input type="number" id="pageCount" value="5">
                    </div>
                </div>
            </div>
            <!-- 정렬 & Filter 위치 -->
            <div>
                <label class="title-label">정렬 & Filter 위치</label>
                <div class="option-title">
                    <div class="option-list">
                        <input type="radio" id="headerBtnLeftSortdefault" name="headerBtnLeftSort" value="default">
                        <label for="headerBtnLeftSortdefault">기본</label>
                    </div>
                    <div class="option-list">
                        <input type="radio" id="headerBtnLeftSortleft" name="headerBtnLeftSort" value="left" checked>
                        <label for="headerBtnLeftSortleft">왼쪽고정</label>
                    </div>
                </div>
            </div>
            <!-- 행 높이 -->
            <div class="option-list input-option">
                <label for="rowHeight" class="title-label">행 높이</label>
                <input type="number" id="rowHeight" value="22">
            </div>
        </div>
    </div>
</body>
</html>