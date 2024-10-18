# Search the system path (Env:Path) directories for the existence for SQLite3.exe 

# $path = (Get-ChildItem "jsd djej sjdj ajf").value.split(" ")
param($fname,$outdb)  # 取得外部 %1 %2
$fname
$outdb.length()
$i=0
$dir ='sql_' + (Get-Date -Format "MMdd_HH")
$dir
Remove-Item -path $dir -recurse
Remove-Item $outdb -recurse
mkdir $dir
mdb-schema $fname sqlite > $dir/schema
$tables =(mdb-tables.exe $fname).Trim().split(' ')
Write-Host "tables name"
foreach ($n in $tables)
{
	Write-Host  table name --> $n  .. 
	$outSQL = mdb-export -D "%Y-%m-%d %H:%M:%S" -H -I sqlite $fname $n 
	$outSQL = $outSQL.replace('"',"'")
	$outSQL> $dir/$n.sql
}

get-content $dir/schema | sqlite3 $outdb

$folders = Get-ChildItem  $dir\  -Recurse -Filter *.sql
foreach ($lis in $folders) {
	$lis.FullName
	get-content $lis.FullName | sqlite3 $outdb
}

#foreach ($f in $file)
#{
#	Write-Host  table write --> $n  .. 
#	get-content $f | sqlite3 $outdb
#}

#for f in $dir/*.sql ; do 
#  echo $f 
#  (echo 'BEGIN;'; cat $f; echo 'COMMIT;') | $sqlite $sql
#done
#echo "Using $dir"


# Write-Host 'user'.split("e")
#Write-Host $pp.split(' ')
#$pp.split(' ')
# foreach ($line in $path)
#    {
#        $i++; 
#		Write-Host "$line "
#    }