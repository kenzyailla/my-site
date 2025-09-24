   // وظيفة التبديل بين التبويبات
        function openTab(tabId) {
            // إخفاء جميع محتويات التبويبات
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // إلغاء تنشيط جميع أزرار التبويب
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // تفعيل التبويب المحدد
            document.getElementById(tabId).classList.add('active');
            
            // تفعيل زر التبويب المحدد
            document.querySelector(`button[onclick="openTab('${tabId}')"]`).classList.add('active');
        }
        
        // حفظ الحالة الأصلية للجدول
        const originalTables = {};
        document.querySelectorAll('table').forEach(table => {
            originalTables[table.id] = table.innerHTML;
        });

        // وظيفة البحث عن المواد
        function searchMaterials() {
            const searchText = document.getElementById('searchInput').value.trim().toLowerCase();
            const category = document.getElementById('categorySelect').value;
            
            // إذا لم يتم إدخال نص بحث، عرض كل الجداول
            if (!searchText) {
                resetSearch();
                return;
            }
            
            // تحديد الجداول التي سيتم البحث فيها
            let tablesToSearch;
            if (category === 'all') {
                tablesToSearch = document.querySelectorAll('table');
            } else {
                tablesToSearch = document.querySelectorAll(`#${category}Table`);
            }
            
            // إخفاء جميع الجداول أولاً
            document.querySelectorAll('table').forEach(table => {
                table.style.display = 'none';
            });
            
            // البحث في الجداول المحددة
            let foundResults = false;
            
            tablesToSearch.forEach(table => {
                if (table) {
                    const rows = table.querySelectorAll('tr');
                    let tableHasResults = false;
                    
                    // إعادة الجدول إلى حالته الأصلية أولاً
                    table.innerHTML = originalTables[table.id];
                    
                    rows.forEach((row, index) => {
                        // تخطي رأس الجدول
                        if (index === 0) return;
                        
                        const cells = row.querySelectorAll('td');
                        let rowMatches = false;
                        
                        cells.forEach(cell => {
                            const originalText = cell.textContent;
                            if (originalText.toLowerCase().includes(searchText)) {
                                rowMatches = true;
                                cell.innerHTML = originalText.replace(
                                    new RegExp(searchText, 'gi'), 
                                    match => `<span class="highlight">${match}</span>`
                                );
                            }
                        });
                        
                        if (rowMatches) {
                            row.style.display = '';
                            tableHasResults = true;
                            foundResults = true;
                        } else {
                            row.style.display = 'none';
                        }
                    });
                    
                    // إظهار الجدول إذا كان يحتوي على نتائج
                    if (tableHasResults) {
                        table.style.display = 'table';
                    }
                }
            });
            
            // إذا لم توجد نتائج، عرض رسالة
            if (!foundResults) {
                alert('لم يتم العثور على نتائج لـ: ' + searchText);
                resetSearch();
            }
        }
        
        // وظيفة إعادة تعيين البحث
        function resetSearch() {
            // إعادة جميع الجداول إلى حالتها الأصلية
            for (const tableId in originalTables) {
                const table = document.getElementById(tableId);
                if (table) {
                    table.innerHTML = originalTables[tableId];
                    table.style.display = 'table';
                }
            }
            
            // مسح حقل البحث
            document.getElementById('searchInput').value = '';
            document.getElementById('categorySelect').value = 'all';
        }
        
        // البحث عند الضغط على Enter
        document.getElementById('searchInput').add
   