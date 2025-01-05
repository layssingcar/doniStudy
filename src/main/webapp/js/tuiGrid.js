/* 
    Toast UI Grid: NHN Coporation에서 개발한 JavaScript 기반의 그리드 컴포넌트
    https://ui.toast.com/tui-grid

    [ Toast UI Grid 메서드 ]
    * new tui.Grid(options): Grid 초기화
    * resetData(data): 기존 데이터를 삭제하고 새로운 데이터를 설정
    * getColumns(): 현재 설정된 칼럼 배열 반환
    * setColumns(columns): 기존 칼럼을 삭제하고 새로운 칼럼으로 설정
    * appendRow(data, options): 새로운 행을 그리드의 마지막에 추가
    * removeRow(rowKey): 특정 행을 삭제
    * getData(): 현재 그리드의 모든 데이터를 배열 형태로 반환

    [ 구현한 기능 ]
    * 데이터 검색
    * Editable 옵션
    * 
 */

$(document).ready(function () {
    const gridBtn = $('.grid-btn'); // 버튼 컨테이너

    // 기본 colModel 설정
    let colModel = [
        { header: "아이디", name: 'boardId', editor: 'text'},
        { header: "제목", name: 'boardTitle', editor: 'text'},
        { header: "내용", name: 'boardContent', editor: 'text'},
        { header: "작성자", name: 'writerId', editor: 'text'}
    ];

    // Toast UI Grid 초기화
    let grid = new tui.Grid({
        el: $('#grid')[0], // 그리드 요소
        columns: colModel, 
        editingEvent: 'click', // 그리드 셀 클릭 시 편집 가능
        rowHeaders: []
    });

    // 비동기로 데이터 읽어와 dataList에 저장
    let dataList = [];
    function createGrid() {
        $.ajax({
            url: '/board/selectList',
            dataType: 'json',
            success: function (data) {
                dataList = data;
                grid.resetData(dataList);
            }
        });
    }
    createGrid();

    tempGrid = grid;
    // 검색 버튼 클릭
    $(".search-btn").on("click", function () {
        searchRows();
    });

    // 검색어 엔터
    $(".search-input").on("keydown", function (event) {
        if (event.key === "Enter") {
            searchRows();
        }
    });

    // 검색 함수
    function searchRows() {
        const searchInput = $(".search-input").val(); // 입력된 검색어 가져오기
        const postData = data.filter(function (item) {
            return (
                item.boardTitle.toLowerCase().includes(searchInput) ||
                item.boardContent.toLowerCase().includes(searchInput) ||
                item.writerId.toLowerCase().includes(searchInput)
            );
        });
        grid.resetData(postData);
    }

    // 초기 checked 옵션 설정
    $('input[type="checkbox"], input[type="radio"]').each(function () {
        if ($(this).is(':checked')) {
            $(this).next('label').addClass('checked');
        }
    });

    // 라디오버튼, 체크박스 checked 옵션
    $('input[type="radio"], input[type="checkbox"]').on('change', function () {
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
    
        const columns = grid.getColumns().map(column => {
            if (isEditable) {
                column.editor = 'text';
            } else {
                delete column.editor;
            }
            return column;
        });
        grid.setColumns(columns);
    });

    // 순번 옵션
    $('#rowNumY').on('change', function() {
        let rowNumOrder = $('#rowNumOrder');
        if ($(this).is(':checked')) {
            grid.setColumns(grid.getColumns(), {rowHeaders: ['rowNum']}); // 데이터를 다시 설정하여 렌더링
            grid.refreshLayout();   // 레이아웃 갱신
            rowNumOrder.show();     // 정렬 옵션 표시
        } else {
            grid.setColumns(grid.getColumns(), {rowHeaders: []}); // 행 번호 제거
            grid.refreshLayout();   // 레이아웃 갱신
            rowNumOrder.hide();     // 정렬 옵션 숨김
        }
    });

    // 버튼 옵션
    $('#useButtongrid-add, #useButtongrid-delete, #useButtongrid-copy, #useButtongrid-save, #useButtongrid-upDown').on('change', function () {
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
        const newRowData = {boardId: '', boardTitle: '', boardContent: '', writerId: ''};
        grid.appendRow(newRowData);
    });
    
    // 저장 버튼
    gridBtn.on('click', '.grid-save-btn', function() {
        $.ajax({
            url: '/board/updateList', 
            contentType: 'application/json',
            data: JSON.stringify({"dataList": grid.getData()}), 
            method: 'PUT', 
            success: function(data) {
                alert("저장되었습니다.");
                dataList = grid.getData();
                location.reload();
            }
        })
    });
});