#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use DBI;
use JSON;
use Diagnostics;

 print "Content-type: application/json \n\n";

my $driver = "SQLite";
my $database = "/Library/WebServer/Documents/perl_project/database/appointment.db";
my $dsn = "DBI:$driver:dbname=$database";
my $userid = "";
my $password = "";

my $dbh = DBI->connect("$dsn","$userid","$password",{RaiseError => 1}) or die $DBI::errstr;

my $q = CGI->new();


#my $date_time = "2007-12-12 10:00:00";
#my $description = "This is appointment from perl"; 
my $date_time = $q->param('datetime');
my $description = $q->param('description');
print "desc:  $description   datetime:  $date_time \n";
my $sql = "insert into appointment(apt_date, description) values(?, ?)";
my $stmt = $dbh->prepare($sql) or die "error in preparing $DBI::errstr \n";;
$stmt->execute($date_time,$description) or die "error in executing $DBI::errstr \n";
$stmt->finish;
$dbh->commit or die $DBI::errstr;
print "Content-type: application/json \n\n";
print '{"result": "success"}';
