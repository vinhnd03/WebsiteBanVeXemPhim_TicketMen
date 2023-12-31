package nhom3.datn.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import nhom3.datn.entity.Movie;
import nhom3.datn.entity.Ticket;

public interface MovieDao extends JpaRepository<Movie, Long> {
       @Query("SELECT m FROM Movie m WHERE m.category.id=?1")
       List<Movie> findByCategoryId(Integer cid);

       @Query("SELECT DISTINCT m FROM Movie m INNER JOIN Ticket t ON m.id = t.movie.id WHERE CONVERT(DATE, t.date) >= CONVERT(DATE, CURRENT_TIMESTAMP)")
       List<Movie> findAllAvailable();

       @Query("SELECT m FROM Movie m INNER JOIN Ticket t ON m.id = t.movie.id ORDER BY t.date ASC")
       List<Movie> findAllSorted();

       @Query("SELECT DISTINCT M FROM Movie M " +
                     "INNER JOIN Ticket T ON M.id = T.movie.id " +
                     "WHERE CONVERT(DATE, T.date) = CONVERT(DATE, CURRENT_TIMESTAMP)")
       List<Movie> findTodayMovie();

       @Query("SELECT DISTINCT M FROM Movie M " +
                     "INNER JOIN Ticket T ON M.id = T.movie.id " +
                     "WHERE CONVERT(DATE, T.date) BETWEEN DATEADD(DAY, 1, CONVERT(DATE, CURRENT_TIMESTAMP)) " +
                     "AND DATEADD(DAY, 6, CONVERT(DATE, CURRENT_TIMESTAMP))")
       List<Movie> findFutureMovie();

       @Query("SELECT m FROM Movie m WHERE m.name = ?1 AND m.country = ?2")
       List<Movie> findByNameAndCountry(String name, String country);

       @Query("SELECT m FROM Movie m WHERE m.name = ?1 AND m.country = ?2 AND m.category.id = ?3")
       List<Movie> findByNameAndCountryAndCategoryId(String name, String country, Integer categoryId);

       @Query("SELECT m FROM Movie m WHERE m.name  LIKE LOWER(CONCAT('%', :name, '%'))")
       List<Movie> findByName(String name);


       @Query("SELECT DISTINCT M FROM Movie M " +
           "INNER JOIN Ticket T ON M.id = T.movie.id " +
           "WHERE CONVERT(DATE, T.date) >= CONVERT(DATE, CURRENT_TIMESTAMP)")
    List<Movie> findMovieWithTodayAndFutureTicket();


     @Query("SELECT T FROM Movie M " +
           "INNER JOIN Ticket T ON M.id = T.movie.id " +
           "WHERE T.movie.id = ?1 AND  CONVERT(DATE, T.date) >= CONVERT(DATE, CURRENT_TIMESTAMP)")
    List<Ticket> findByTicketFutureMovieId(Long id);

       //and CONVERT(DATE, T.date) >= CONVERT(DATE, CURRENT_TIMESTAMP)
       @Query("SELECT T FROM Ticket T WHERE T.date = :date And T.movie.id = :movieId ")
       List<String> findTimeByDate(@Param("date") String date, @Param("movieId") Long id);
}
 