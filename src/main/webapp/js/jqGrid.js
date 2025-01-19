/*
    jqGrid: JavaScript 기반의 그리드 플러그인 (주로 jQuery 라이브러리와 함께 사용)
    https://www.trirand.com/blog/jqgrid/jqgrid.html

    [ jqGrid 메서드 ]
    * jqGrid(): jqGrid를 초기화하거나, 이미 초기화된 그리드에 특정 기능을 추가/수정
    * trigger(): 특정 이벤트를 수동으로 발생시켜 그리드의 동작을 강제로 실행하도록 함
        - setGridParam: 그리드 설정 값 변경
        - getGridParam: 그리드 설정 값 조회
        - reloadGrid: 그리드 데이터 새로고침
        - addRowData: 새로운 행 추가
        - delRowData: 행 삭제
        - getRowData: 행 데이터 조회
        - hideCol: 칼럼 숨기기
        - showCol: 칼럼 표시
    
    [ 기타 사용한 API ]
    * detach(): DOM 요소 제거 (삭제된 요소의 데이터와 이벤트 핸들러는 유지)
    * unshift(): 배열의 맨 앞에 요소 추가
    * shift(): 배열의 첫 번째 요소 제거
    * closest(): 현재 요소에서 가장 가까운 상위 요소 검색

    [ 구현한 기능 ]
    * 데이터 검색
    * Editable 옵션
    * 순번 옵션
    * 정렬 옵션 (ASC, DESC)
    * 선택 유형 옵션 (Single, Multi, None)
    * 버튼 옵션 (추가, 삭제, 복사, 저장, Up/Down)
    * 행 추가 위치 옵션 (상단, 하단)
    * 말줄임표 옵션
    * 전체 건 수 표시 옵션
    * 페이징 옵션
        - 페이징 행 설정 (직접입력, 선택목록)
        - 페이징 당 행 개수
    * 정렬 위치 옵션
    * 행 높이 옵션
 */

$(document).ready(function () {
    const grid = $("#grid");        // 테이블
    const gridBtn = $('.grid-btn'); // 버튼 컨테이너
    let selRowsBoardId = [];        // 선택된 행의 아이디 값을 담을 배열

    // 기본 colNames 설정
    let colNames = ['아이디', '제목', '내용', '작성자'];

    // 기본 colModel 설정
    let colModel = [
        {name: 'boardId', index: 'boardId', width: 100, editable: false},
        {name: 'boardTitle', index: 'boardTitle', width: 200, editable: true},
        {name: 'boardContent', index: 'boardContent', width: 300, editable: true},
        {name: 'writerId', index: 'writerId', width: 100, editable: true}
    ];
    
    // 비동기로 데이터 읽어와 dataList에 저장
    let dataList = [];

    // 데이터 원본을 복사해서 저장할 변수
    let copyDataList; 

    $.ajax({
        url: '/board/selectList',   // 데이터 URL
        datatype: 'json',           // 데이터 타입
        success: function(data) {
            dataList = data;
            createGrid();
            copyDataList = [...dataList]; // 원본을 복사해서 저장
        }
    });

    // 체크박스 데이터 목록 가져오기
    $.ajax({
        url: '/getCheckboxList',
        method: 'GET',
        success: function (data) {
            const searchCheckboxList = $('.search-checkbox-list');
            data.forEach(function (item) {
                // 체크박스 생성
                const checkbox = `
                    <div class="option-list">
                        <input type="checkbox" id="${item}" value="${item}">
                        <label for="${item}">${item}</label>
                    </div>
                `;
                searchCheckboxList.append(checkbox);
            });
        },
        error: function (error) {
            console.error('체크박스 목록을 가져오는 데 실패했습니다:', error);
        }
    });

    // 검색 버튼 클릭
    $(".search-btn").on("click", function() {
        searchRows();
    });

    // 검색어 엔터
    $(".search-input").on("keydown", function(event) {
        if (event.key === "Enter") {
            searchRows();
        }
    });

    // 검색 함수
    function searchRows() {
        const searchInput = $(".search-input").val(); // 입력된 검색어 가져오기
        const searchCheckbox = []; // 선택된 체크박스 값

        // 선택된 체크박스 값 가져오기
        $('.search-checkbox-list input[type="checkbox"]:checked').each(function() {
            searchCheckbox.push($(this).val());
        });

        // dataList 초기화
        dataList = copyDataList;

        // 선택된 체크박스 값과 writerId가 일치하는 data만 필터링
        const filterList = dataList.filter(item => { 
            for (let value of searchCheckbox){
                if (item.writerId === value) return item;
            }
        });

        if (filterList.length > 0){ 
            dataList = filterList; 
        }

        createGrid(); // 필터링된 데이터로 그리드 생성

        grid.jqGrid('setGridParam', {
            search: true, 
            postData: {
                filters: JSON.stringify({
                    groupOp: "OR",
                    rules: [
                        {
                            field: "boardTitle",
                            op: "cn", // contains
                            data: searchInput
                        }, 
                        {
                            field: "boardContent",
                            op: "cn", // contains
                            data: searchInput
                        }, 
                        {
                            field: "writerId",
                            op: "cn", // contains
                            data: searchInput
                        }
                    ]
                        
                })
            }
        }).trigger("reloadGrid")
    }

    // 초기 checked 옵션 설정
    $('input[type="checkbox"], input[type="radio"]').each(function() {
        if ($(this).is(':checked')) {
            $(this).next('label').addClass('checked');
        }
    });

    // 라디오버튼, 체크박스 checked 옵션
    $('input[type="radio"], input[type="checkbox"]').on('change', function() {
        // 같은 이름의 라디오버튼 label 클래스 제거
        if ($(this).attr('type') === 'radio') {
            $('input[name="' + $(this).attr('name') + '"]').next('label').removeClass('checked');
        }

        if ($(this).is(':checked')) {
            $(this).next('label').addClass('checked');
        } else {
            $(this).next('label').removeClass('checked');
        }
    });

    // Editable 옵션
    $('#gridEditableYn input[type=radio]').on('change', function() {
        let isEditable = $(this).val() === 'Y';
        if (isEditable) {
            grid.jqGrid('setGridParam', {cellEdit: true});
        } else {
            grid.jqGrid('setGridParam', {cellEdit: false});
        }
        grid.trigger('reloadGrid'); // 데이터 새로고침
    });

    // 순번 옵션
    $('#rowNumY').on('change', function() {
        let rowNumOrder = $('#rowNumOrder');
        if ($(this).is(':checked')) {
            grid.jqGrid('showCol', 'rn');   // 순번 칼럼 표시
            rowNumOrder.show();             // 정렬 옵션 표시
        } else {
            grid.jqGrid('hideCol', 'rn');   // 순번 칼럼 숨김
            rowNumOrder.hide();             // 정렬 옵션 숨김
            // 정렬 옵션 오름차순 설정
            $('#rowNumOrder input[type=radio][value="asc"]').trigger('click');
        }
    });

    // 정렬 옵션
    $('#rowNumOrder input[type=radio]').on('click', function() {
        let rowNumOrder = $(this).val();
        let tbody = grid.find('tbody');
        let rows = tbody.find('tr.jqgrow'); // 데이터 행

        // 현재 데이터를 배열로 수집
        let rowsData = [];
        rows.each(function() {
            let rownumCell = $(this).find('td[aria-describedby$="_rn"]');
            let value = parseInt(rownumCell.text(), 10); // 순번 텍스트를 정수로 변환
            rowsData.push({
                element: $(this),
                value: value
            });
        });

        // 데이터 정렬
        rowsData.sort(function(a, b) {
            return rowNumOrder === 'asc' ? a.value - b.value : b.value - a.value;
        });

        // DOM 요소 제거
        rows.detach();

        // 정렬된 순서대로 행을 다시 추가
        rowsData.forEach(function(row) {
            tbody.append(row.element);
        });
    });

    // 선택 유형 옵션
    $('input[name="selectType"]').on('change', function() {
        setSelectType($(this).val());
    });

    // 선택 유형 설정 함수
    function setSelectType(type){
        // 이전에 Single 옵션을 선택한 경우 선택 유형 칼럼 제거
        if (colNames.includes('')) {
            colNames.shift();
            colModel.shift();
        }
        // Multi 옵션
        if (type === 'checkbox') {
            createGrid(true);
            return;
        }
        // None 옵션
        if (type === 'none') {
            createGrid(false);
            return;
        }
        
        // Single 옵션
        colNames.unshift(''); // 선택 유형 칼럼 헤더 추가
        // 선택 유형 칼럼 모델 추가
        colModel.unshift({ 
            name: 'selectType', 
            index: 'selectType', 
            width: '20px',
            align: 'center',
            formatter: function(cellvalue, options, rowObject) {
                return `<input type="${type}" name="selectRow" value="${options.rowId}">`;
            }
        });
        createGrid(false); // 그리드 재생성
    
        // Single 데이터 행 선택 시 highlight 클래스 추가
        $("input[name='selectRow']").on('change', function() {
            const tr = $(this).closest('tr'); // 선택한 데이터 행의 가장 가까운 tr 요소
            $('tr.ui-state-highlight').removeClass('ui-state-highlight'); // 기존 highlight 클래스 제거
            if ($(this).is(':checked')) {
                tr.addClass('ui-state-highlight');
            }
        });
    }

    // 버튼 옵션
    $('#useButtongrid-add, #useButtongrid-delete, #useButtongrid-copy, #useButtongrid-save, #useButtongrid-upDown').on('change', function() {
        gridBtn.empty(); // 기존 버튼 제거

        if ($('#useButtongrid-add').is(':checked')) {
            gridBtn.append('<button class="btn grid-add-btn">추가</button>');
        }
        if ($('#useButtongrid-delete').is(':checked')) {
            gridBtn.append('<button class="btn grid-delete-btn">삭제</button>');
        }
        if ($('#useButtongrid-copy').is(':checked')) {
            gridBtn.append('<button class="btn grid-copy-btn">복사</button>');
        }
        if ($('#useButtongrid-save').is(':checked')) {
            gridBtn.append('<button class="btn grid-save-btn">저장</button>');
        }
        if ($('#useButtongrid-upDown').is(':checked')) {
            gridBtn.append('<button class="btn grid-up-btn">▲</button>');
            gridBtn.append('<button class="btn grid-down-btn">▼</button>');
        }
    });

    // 행 추가 버튼
    gridBtn.on('click', '.grid-add-btn', function() {
        const newRowData = {UserId: '', title: '', content: ''};  // 새 행 데이터
        const addRowAt = $('input[name="addRowAt"]:checked').val(); // 행 추가 위치 옵션 값

        if (addRowAt === 'bottom') {
            grid.jqGrid('addRowData', undefined, newRowData, 'last');
        } else {
            grid.jqGrid('addRowData', undefined, newRowData, 'first');
        }
    });

    // 행 삭제 버튼
    gridBtn.on('click', '.grid-delete-btn', function() {
        const selectType = $('input[name="selectType"]:checked').val();
        let selectedRows = [];

        if (selectType === 'radio') { // Single
            selectedRows = grid.jqGrid('getGridParam', 'selrow');
            if (selectedRows) {
                const boardId = grid.jqGrid("getRowData", selectedRows).boardId;
                selRowsBoardId.push(boardId); // 선택된 행의 아이디 값 배열에 push
                grid.jqGrid('delRowData', selectedRows);
            }
        } else if (selectType === 'checkbox') { // Multi
            selectedRows = grid.jqGrid('getGridParam', 'selarrrow');
            if (selectedRows.length > 0) {
                for (let i = selectedRows.length - 1; i >= 0; i--) { // 역순으로 삭제
                    const boardId = grid.jqGrid('getRowData', selectedRows[i]).boardId;
                    selRowsBoardId.push(boardId); // 선택된 행의 아이디 값 배열에 push
                    grid.jqGrid('delRowData', selectedRows[i]);
                }
            }
        }
    });

    // 행 복사 버튼
    gridBtn.on('click', '.grid-copy-btn', function() {
        const selectType = $('input[name="selectType"]:checked').val();
        let selectedRows = [];
        let rowData = [];
    
        if (selectType === 'radio') { // Single
            selectedRows = grid.jqGrid('getGridParam', 'selrow');
            if (selectedRows) {
                rowData = grid.jqGrid('getRowData', selectedRows);
                grid.jqGrid('addRowData', undefined, rowData, 'after', selectedRows);
            }
        } else if (selectType === 'checkbox') { // Multi
            selectedRows = grid.jqGrid('getGridParam', 'selarrrow');
            if (selectedRows.length > 0) {
                selectedRows.forEach(function(rowId) {
                    rowData = grid.jqGrid('getRowData', rowId);
                    grid.jqGrid('addRowData', undefined, rowData, 'after', rowId);
                });
            }
        }
    });

    // 저장 버튼
    gridBtn.on('click', '.grid-save-btn', function() {
        $.ajax({
            url: '/board/updateList', 
            contentType: 'application/json',
            data: JSON.stringify({"dataList" : dataList, "selRowsBoardId" : selRowsBoardId}), 
            method: 'PUT', 
            success: function(data) {
                alert("저장되었습니다.");
                location.reload();
            }
        })
    });

    // Up 버튼
    gridBtn.on('click', '.grid-up-btn', function() {
        const selectType = $('input[name="selectType"]:checked').val();
        let selectedRows = [];

        if (selectType === 'radio') { // Single
            selectedRows = [grid.jqGrid('getGridParam', 'selrow')];
        } else if (selectType === 'checkbox') { // Multi
            selectedRows = grid.jqGrid('getGridParam', 'selarrrow');
        }

        let copyRows = [...selectedRows]; // 선택된 행 아이디를 복사한 배열(행 이동 시 원본 배열의 순서가 바뀌는 문제 해결용)
        copyRows.sort((a,b) => {
            const c1 = parseInt(a.match(/\d+/)[0]); // a에서 숫자 추출
            const c2 = parseInt(b.match(/\d+/)[0]); // b에서 숫자 추출
            return c1 - c2;
        });

        if (selectedRows.length > 0) {
            for (let i = 0; i < selectedRows.length; i++) {
                const rowId = copyRows[i];
                const prevRowId = grid.jqGrid("getPrevRowId", rowId); // 이전 행 ID
                
                if (prevRowId) { // 이전 행이 있을 경우
                    moveRow(rowId, prevRowId, "up"); // 행 이동 함수 호출
                }
            }
        }
    });

    // Down 버튼
    gridBtn.on('click', '.grid-down-btn', function() {
        const selectType = $('input[name="selectType"]:checked').val();
        let selectedRows = [];

        if (selectType === 'radio') { // Single
            selectedRows = [grid.jqGrid('getGridParam', 'selrow')];
        } else if (selectType === 'checkbox') { // Multi
            selectedRows = grid.jqGrid('getGridParam', 'selarrrow');
        }

        let copyRows = [...selectedRows]; // 선택된 행 아이디를 복사한 배열(행 이동 시 원본 배열의 순서가 바뀌는 문제 해결용)
        copyRows.sort((a,b) => {
            const c1 = parseInt(a.match(/\d+/)[0]); // a에서 숫자 추출
            const c2 = parseInt(b.match(/\d+/)[0]); // b에서 숫자 추출
            return c1 - c2;
        });

        if (selectedRows.length > 0) {
            // 선택된 행을 역순으로 처리하여 인덱스 문제를 방지
            for (let i = selectedRows.length - 1; i >= 0; i--) {
                const rowId = copyRows[i];
                const prevRowId = grid.jqGrid("getNextRowId", rowId); // 다음 행 ID
                
                if (prevRowId) { // 이전 행이 있을 경우
                    moveRow(rowId, prevRowId, "down"); // 행 이동 함수 호출
                }
            }
        }
    });

    // 행 이동 함수
    function moveRow(fromRowId, toRowId, direction) {
        const rowData = grid.jqGrid("getRowData", fromRowId); // 선택된 행 데이터 가져오기
        grid.jqGrid("delRowData", fromRowId); // 현재 행 삭제
        grid.jqGrid("addRowData", fromRowId, rowData, direction === "up" ? "before" : "after", toRowId); // 새로운 위치에 삽입

        const $radioButton = $(`#${fromRowId}`).find("td input"); // 라디오,체크박스 버튼 찾기
        $radioButton.prop("checked", true); // 체크 상태 유지

        grid.jqGrid("setSelection", fromRowId); // 행 선택 상태 유지
    }

    // 말줄임표 옵션
    $('#ellipsisY').on('change', function() {
        if ($(this).is(':checked')) {
            $('td[role="gridcell"]').addClass('ellipsis');
        } else {
            $('td[role="gridcell"]').removeClass('ellipsis');
        }
    });
    
    // 전체 건 수 표시 옵션
    $('#totalCountYnY').on('change', function() {
        showPageInfo();
    });

    // 페이징 사용 옵션
    $('#pagingYnY').on('change', function() {
        const rowSettingOption = $('.ui-jqgrid .ui-pg-table .ui-pg-selbox'); // 행 설정 Select 요소
        let pagingOption = $('#pagingOption'); // 페이징 하위 옵션
        showPageInfo(); // 페이징 정보 표시
        
        if ($(this).is(':checked')) {
            pagingOption.show();        // 하위 옵션 표시
            rowSettingOption.hide();    // 행 설정 Select 요소 숨기기
            grid.jqGrid('setGridParam', {
                rowNum: 10 // 기본 값
            }).trigger('reloadGrid');
        } else {
            pagingOption.hide(); // 하위 옵션 숨기기
            grid.jqGrid('setGridParam', {
                rowNum: dataList.length
            }).trigger('reloadGrid');
        }
    });

    // 페이징 행 설정 옵션
    $('#pagingRowSetting').on('change', function() {
        const rowSettingOption = $('.ui-jqgrid .ui-pg-table .ui-pg-selbox'); // 행 설정 Select 요소
        if ($(this).val() === '1') { // 직접입력
            $('.rowSize').show();       // 페이지 당 행 개수 옵션 표시
            rowSettingOption.hide();    // 행 설정 Select 요소 숨기기
            grid.jqGrid('setGridParam', {
                rowNum: parseInt($('#rowSize').val(), 10)
            }).trigger('reloadGrid');
        } else { // 선택목록
            $('.rowSize').hide();       // 페이지 당 행 개수 옵션 숨기기
            rowSettingOption.show();    // 행 설정 Select 요소 표시
            grid.jqGrid('setGridParam', {
                rowNum: rowSettingOption.val()
            }).trigger('reloadGrid');
        }
    });

    // 페이지 당 행 개수 옵션
    $('#rowSize').on('change', function() {
        grid.jqGrid('setGridParam', {
            rowNum: parseInt($(this).val(), 10)
        }).trigger('reloadGrid');
        showPageInfo(); // 페이징 정보 표시
    });

    // 페이지 정보 표시 함수
    function showPageInfo(newPage) {
        let totalCount = grid.jqGrid('getGridParam', 'records');    // 전체 건 수
        let totalPages = grid.jqGrid('getGridParam', 'lastpage');   // 총 페이지 수
        let currentPage = newPage === undefined ? grid.jqGrid('getGridParam', 'page') : newPage;      // 현재 페이지 번호
        
        if ($('#totalCountYnY').is(':checked')) {
            if ($('#pagingYnY').is(':checked')) { // 페이징 사용
                $('.page-info').html(`전체 <span class="total-count">${totalCount}</span> ( ${currentPage} / ${totalPages} )`);
            } else { // 페이징 미사용
                $('.page-info').html(`전체 <span class="total-count">${totalCount}</span>`);
            }
        } else {
            $('.page-info').text('');
        }
    }

    // 정렬 & Filter 필터 위치 옵션
    $('input[name="headerBtnLeftSort"]').on('change', function() {
        if ($(this).val() === 'left') {
            $('.ui-jqgrid .s-ico').addClass('left');
        } else {
            $('.ui-jqgrid .s-ico').removeClass('left');
        }
    });

    // 행 높이 옵션
    $('#rowHeight').on('change', function() {
        const rowHeight = parseInt($(this).val(), 10);
        $('.ui-jqgrid-btable').find('tr.jqgrow').css('height', rowHeight + 'px');
    });

    // 그리드 생성 함수
    function createGrid(multiSelect = false) {
        const newDataList = [...dataList];  // 그리드 데이터 원본 복사
        grid.jqGrid('GridUnload');          // 기존 그리드 제거
        grid.jqGrid({
            datatype: 'local',
            data: newDataList,
            colNames: colNames,
            colModel: colModel,
            autowidth: true,            // 그리드 너비를 컨테이너 요소에 맞춰 자동 조절
            forceFit: true,             // 칼럼 너비 조절 시 다른 칼럼 너비도 자동 조정
            loadonce: true,             // 데이터를 한 번만 로드
            cellEdit: true,             // 그리드 셀 편집 가능
            rownumbers: true,           // 순번
            rownumWidth: 40,            // 순번 너비
            multiselect: multiSelect,   // 다중 선택 활성화
            multiselectWidth: '50px',   // multiselect 칼럼 너비
            rowNum: dataList.length,    // 모든 행 표시
            rowList: [10, 20, 50, 100], // 페이지 당 행 개수 선택목록
            pager: '#pager',            // 페이저 요소
            search: true,
            loadComplete: function(data) {
                // 순번 칼럼 숨기기
                if (!$('#rowNumY').is(':checked')) {
                    $(this).jqGrid('hideCol', 'rn');
                }
                // 정렬 아이콘 왼쪽고정 설정
                if ($('input[name="headerBtnLeftSort"]:checked').val() === 'left') {
                    $('.ui-jqgrid .s-ico').addClass('left');
                }
                // 페이저 표시 여부
                if ($('#pagingYnY').is(':checked')) {
                    $('#pager').show();
                } else {
                    $('#pager').hide();
                }
            },
            onPaging : function(pgButton){
                let newPage = $(this).jqGrid('getGridParam', 'page');
                if (pgButton === 'next') {
                    newPage++;
                } else if (pgButton === 'prev') {
                    newPage--;
                } else if (pgButton === 'first') {
                    newPage = 1;
                } else if (pgButton === 'last') {
                    newPage = $(this).jqGrid('getGridParam', 'lastpage');
                } else {
                    newPage = parseInt(pgButton, 10);
                }

                showPageInfo(newPage);
            }
        });
        dataList = newDataList; // 복사한 데이터를 원본 데이터로 변경
    }

    // jqGrid에 이전 행 ID를 가져오는 함수 추가
    $.jgrid.extend({
        getPrevRowId: function (rowId) {
            const ids = this.getDataIDs(); // 모든 행 ID 가져오기
            const index = ids.indexOf(rowId); // 현재 행의 인덱스
            return index > 0 ? ids[index - 1] : null; // 이전 행 ID 반환
        },
        getNextRowId: function (rowId) {
            const ids = this.getDataIDs(); // 모든 행 ID 가져오기
            const index = ids.indexOf(rowId); // 현재 행의 인덱스
            return index < ids.length - 1 ? ids[index + 1] : null; // 다음 행 ID 반환
        }
    });
});