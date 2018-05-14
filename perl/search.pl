#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use DBI;
use JSON;
use Diagnostics;

my $driver = "SQLite";
my $database = "/Library/WebServer/Documents/perl_project/database/appointment.db";
my $dsn = "DBI:$driver:dbname=$database";
my $userid = "";
my $password = "";

my $dbh = DBI->connect("$dsn","$userid","$password",{RaiseError => 1}) or die $DBI::errstr;

my $q = CGI->new();
my $search_str = $q->param('search_for');
#my $search_str = '3rd' ; #$q->param('search_for');
my $sql = "select * from appointment ";
my $stmt;
if ($search_str) {
  $sql .= " where description like ? ";
  $stmt = $dbh->prepare($sql) or die "cannot prepare $DBI::errstr \n";
  $stmt->execute('%' . $search_str . '%');
} else {
  $stmt = $dbh->prepare($sql) or die "cannot prepare $DBI::errstr \n";
  $stmt->execute();
}
my @results;
while(my $row = $stmt->fetchrow_hashref()) {
    push (@results, $row);
}
$stmt->finish;
print $q->header(-type => 'application/json');
my $json = encode_json \@results;
print $json;
  
